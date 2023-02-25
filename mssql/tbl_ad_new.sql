
IF OBJECT_ID('fn_seq_tbl_ad_new') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_new
IF OBJECT_ID('sp_tbl_ad_new') IS NOT NULL DROP PROCEDURE sp_tbl_ad_new
GO
CREATE FUNCTION fn_seq_tbl_ad_new()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_new),0)+1 FROM tbl_ad_new
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_new
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_new INT = NULL,
  @Id_new_type INT = NULL,
  @Id_vehicle INT = NULL,
  @Id_manager INT = NULL,
  @event_date DATETIME = NULL,
  @event_site NVARCHAR(255) = NULL,
  @price NUMERIC(19,10) = NULL,
  @comment NVARCHAR(999) = NULL,
  @image1 NVARCHAR(255) = NULL,
  @image2 NVARCHAR(255) = NULL,
  @image3 NVARCHAR(255) = NULL,
  @image4 NVARCHAR(255) = NULL,
  @image5 NVARCHAR(255) = NULL,
  @image6 NVARCHAR(255) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_new,
    A.Id_new_type,
    A.Id_vehicle,
    A.Id_manager,
    A.event_date,
    A.event_site,
    A.price,
    A.comment,
    A.image1,
    A.image2,
    A.image3,
    A.image4,
    A.image5,
    A.image6,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_new A WHERE 1 = 1
    AND (COALESCE(@Id_new,A.Id_new) = A.Id_new OR @Id_new IS NULL)
    AND (COALESCE(@Id_new_type,A.Id_new_type) = A.Id_new_type OR @Id_new_type IS NULL)
    AND (COALESCE(@Id_vehicle,A.Id_vehicle) = A.Id_vehicle OR @Id_vehicle IS NULL)
    AND (COALESCE(@Id_manager,A.Id_manager) = A.Id_manager OR @Id_manager IS NULL)
    AND (COALESCE(@event_date,A.event_date) = A.event_date OR @event_date IS NULL)
    AND (COALESCE(@event_site,A.event_site) = A.event_site OR @event_site IS NULL)
    AND (COALESCE(@price,A.price) = A.price OR @price IS NULL)
    AND (COALESCE(@comment,A.comment) = A.comment OR @comment IS NULL)
    AND (COALESCE(@image1,A.image1) = A.image1 OR @image1 IS NULL)
    AND (COALESCE(@image2,A.image2) = A.image2 OR @image2 IS NULL)
    AND (COALESCE(@image3,A.image3) = A.image3 OR @image3 IS NULL)
    AND (COALESCE(@image4,A.image4) = A.image4 OR @image4 IS NULL)
    AND (COALESCE(@image5,A.image5) = A.image5 OR @image5 IS NULL)
    AND (COALESCE(@image6,A.image6) = A.image6 OR @image6 IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_new ON
      
      SET @Id_new = dbo.fn_seq_tbl_ad_new()
      INSERT INTO tbl_ad_new(
      Id_new,
      Id_new_type,
      Id_vehicle,
      Id_manager,
      event_date,
      event_site,
      price,
      comment,
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_new,
      @Id_new_type,
      @Id_vehicle,
      @Id_manager,
      @event_date,
      @event_site,
      @price,
      @comment,
      @image1,
      @image2,
      @image3,
      @image4,
      @image5,
      @image6,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_new A 
      WHERE A.Id_new = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_new OFF
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
    A.Id_new_type = @Id_new_type,
    A.Id_vehicle = @Id_vehicle,
    A.Id_manager = @Id_manager,
    A.event_date = @event_date,
    A.event_site = @event_site,
    A.price = @price,
    A.comment = @comment,
    A.image1 = @image1,
    A.image2 = @image2,
    A.image3 = @image3,
    A.image4 = @image4,
    A.image5 = @image5,
    A.image6 = @image6,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_new A
    WHERE A.Id_new = @Id_new
    
    SELECT A.* FROM tbl_ad_new A 
    WHERE A.Id_new = @Id_new
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_new
    WHERE Id_new = @Id_new
    
    SELECT @Id_new Id_new
  END
  
SET NOCOUNT OFF
