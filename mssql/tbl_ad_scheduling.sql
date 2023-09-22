
IF OBJECT_ID('fn_seq_tbl_ad_scheduling') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_scheduling
IF OBJECT_ID('sp_tbl_ad_scheduling') IS NOT NULL DROP PROCEDURE sp_tbl_ad_scheduling
GO
CREATE FUNCTION fn_seq_tbl_ad_scheduling()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_scheduling),0)+1 FROM tbl_ad_scheduling
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_scheduling
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_scheduling INT = NULL,
  @Id_vehicle INT = NULL,
  @comment NVARCHAR(999) = NULL,
  @source_address NVARCHAR(255) = NULL,
  @destination_address NVARCHAR(255) = NULL,
  @driver NVARCHAR(50) = NULL,
  @start_date DATETIME = NULL,
  @end_date DATETIME = NULL,
  @mileage_start INT = NULL,
  @mileage_end INT = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_scheduling,
    A.Id_vehicle,
    A.comment,
    A.source_address,
    A.destination_address,
    A.driver,
    A.start_date,
    A.end_date,
    A.mileage_start,
    A.mileage_end,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_scheduling A WHERE 1 = 1
    AND (COALESCE(@Id_scheduling,A.Id_scheduling) = A.Id_scheduling OR @Id_scheduling IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@source_address,A.source_address) = A.source_address OR @source_address IS NULL)
    AND (COALESCE(@destination_address,A.destination_address) = A.destination_address OR @destination_address IS NULL)
    AND (COALESCE(@driver,A.driver) = A.driver OR @driver IS NULL)
    AND (COALESCE(@start_date,A.start_date) = A.start_date OR @start_date IS NULL)
    AND (COALESCE(@end_date,A.end_date) = A.end_date OR @end_date IS NULL)
    AND (COALESCE(@mileage_start,A.mileage_start) = A.mileage_start OR @mileage_start IS NULL)
    AND (COALESCE(@mileage_end,A.mileage_end) = A.mileage_end OR @mileage_end IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_scheduling ON
      
      SET @Id_scheduling = dbo.fn_seq_tbl_ad_scheduling()
      INSERT INTO tbl_ad_scheduling(
      Id_scheduling,
      Id_vehicle,
      comment,
      source_address,
      destination_address,
      driver,
      start_date,
      end_date,
      mileage_start,
      mileage_end,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_scheduling,
      @Id_vehicle,
      @comment,
      @source_address,
      @destination_address,
      @driver,
      @start_date,
      @end_date,
      @mileage_start,
      @mileage_end,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_scheduling A 
      WHERE A.Id_scheduling = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_scheduling OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.Id_vehicle = @Id_vehicle,
    A.comment = @comment,
    A.source_address = @source_address,
    A.destination_address = @destination_address,
    A.driver = @driver,
    A.start_date = @start_date,
    A.end_date = @end_date,
    A.mileage_start = @mileage_start,
    A.mileage_end = @mileage_end,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_scheduling A
    WHERE A.Id_scheduling = @Id_scheduling
    
    SELECT A.* FROM tbl_ad_scheduling A 
    WHERE A.Id_scheduling = @Id_scheduling
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_scheduling
    WHERE Id_scheduling = @Id_scheduling
    
    SELECT @Id_scheduling Id_scheduling
  END
  
SET NOCOUNT OFF
