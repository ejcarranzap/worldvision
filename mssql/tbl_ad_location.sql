
IF OBJECT_ID('fn_seq_tbl_ad_location') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_location
IF OBJECT_ID('sp_tbl_ad_location') IS NOT NULL DROP PROCEDURE sp_tbl_ad_location
GO
CREATE FUNCTION fn_seq_tbl_ad_location()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_location),0)+1 FROM tbl_ad_location
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_location
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_location INT = NULL,
  @Id_location_parent INT = NULL,
  @Id_location_type INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @lat NUMERIC(19,10) = NULL,
  @lon NUMERIC(19,10) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_location,
    A.Id_location_parent,
    A.Id_location_type,
    A.code,
    A.name,
    A.lat,
    A.lon,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_location A WHERE 1 = 1
    AND (COALESCE(@Id_location,A.Id_location) = A.Id_location OR @Id_location IS NULL)
    AND (COALESCE(@Id_location_parent,A.Id_location_parent) = A.Id_location_parent OR @Id_location_parent IS NULL)
    AND (COALESCE(@Id_location_type,A.Id_location_type) = A.Id_location_type OR @Id_location_type IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@lat,A.lat) = A.lat OR @lat IS NULL)
    AND (COALESCE(@lon,A.lon) = A.lon OR @lon IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_location ON
      
      SET @Id_location = dbo.fn_seq_tbl_ad_location()
      INSERT INTO tbl_ad_location(
      Id_location,
      Id_location_parent,
      Id_location_type,
      code,
      name,
      lat,
      lon,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_location,
      @Id_location_parent,
      @Id_location_type,
      @code,
      @name,
      @lat,
      @lon,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_location A 
      WHERE A.Id_location = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_location OFF
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
    A.Id_location_parent = @Id_location_parent,
    A.Id_location_type = @Id_location_type,
    A.code = @code,
    A.name = @name,
    A.lat = @lat,
    A.lon = @lon,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_location A
    WHERE A.Id_location = @Id_location
    
    SELECT A.* FROM tbl_ad_location A 
    WHERE A.Id_location = @Id_location
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_location
    WHERE Id_location = @Id_location
    
    SELECT @Id_location Id_location
  END
  
SET NOCOUNT OFF
